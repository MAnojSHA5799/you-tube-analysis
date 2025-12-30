export default function VideosTable({ videos }) {
    return (
      <>
        <h3>🎥 Top Videos</h3>
        <table width="100%" border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Title</th>
              <th>Channel</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((v, i) => (
              <tr key={i}>
                <td>{v.title}</td>
                <td>{v.channel}</td>
                <td>{v.description?.slice(0, 80)}...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
  