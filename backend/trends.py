import sys
import json
import time
from pytrends.request import TrendReq
from pytrends.exceptions import TooManyRequestsError

# ---------- Input ----------
query = sys.argv[1]

# ---------- Init ----------
pytrends = TrendReq(
    hl="en-IN",
    tz=330,
    retries=1,
    backoff_factor=0.2
)

result = {
    "timeTrend": [],
    "topCities": []
}

try:
    # ================= TIME TREND =================
    pytrends.build_payload(
        [query],
        timeframe="today 12-m",
        geo="IN"
    )

    time_df = pytrends.interest_over_time()

    if not time_df.empty:
        for date, row in time_df.iterrows():
            result["timeTrend"].append({
                "date": str(date.date()),
                "value": int(row[query])
            })

    time.sleep(1)  # anti-block delay

    # ================= REGION WISE =================
    city_df = pytrends.interest_by_region(
        resolution="CITY",
        inc_low_vol=True
    )

    # ---- FALLBACK TO STATE ----
    if city_df.empty:
        city_df = pytrends.interest_by_region(
            resolution="REGION",
            inc_low_vol=True
        )

    if not city_df.empty:
        city_df = city_df.sort_values(
            by=query,
            ascending=False
        ).head(10)

        for region, row in city_df.iterrows():
            result["topCities"].append({
                "city": region,
                "value": int(row[query])
            })

except TooManyRequestsError:
    result["error"] = "Google rate limit hit. Try again later."

except Exception as e:
    result["error"] = str(e)

# ---------- Output ----------
print(json.dumps(result))
