export default function CityDemand({ cities }) {
    return (
      <>
        <h3>🏙️ City Demand</h3>
        <table width="100%" border="1" cellPadding="8">
          <thead>
            <tr>
              <th>City</th>
              <th>Demand</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((c, i) => (
              <tr key={i}>
                <td>{c.city}</td>
                <td>{c.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
  