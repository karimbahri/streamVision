export default function Notification(props: any) {
  return (
    <div className={`notification ${props.classValue}`}>
      <p>{props.message}</p>
    </div>
  );
}
