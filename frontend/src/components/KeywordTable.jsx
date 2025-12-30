export default function KeywordTable({ keywords }) {
  return (
    <>
      <h3>🔑 Top Keywords</h3>
      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Keyword</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {keywords.map((k, i) => (
            <tr key={i}>
              <td>{k.word}</td>
              <td>{k.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
