export const Progress = ({ value = 0 }: any) => {
  return (
    <div style={{ background: "#eee", height: "10px" }}>
      <div style={{ width: `${value}%`, background: "green", height: "100%" }} />
    </div>
  );
};