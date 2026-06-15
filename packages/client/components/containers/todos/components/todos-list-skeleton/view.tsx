export function TodosListSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <tr key={`skeleton-${index}`}>
          <td>
            <p>{index + 1}</p>
          </td>
          <td>
            <p
              className="skeleton h-4"
              style={{
                width: `${index * 5 * (index % 2 ? 1 : -1) + 40}%`,
              }}
            />
          </td>
        </tr>
      ))}
    </>
  );
}
