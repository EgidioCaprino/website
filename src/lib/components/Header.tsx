interface Props {
  title: string;
  description: string;
}

export default function Header({ title, description }: Props) {
  return (
    <div>
      <h1 className="h1">{title}</h1>
      <p className="lead">{description}</p>
    </div>
  );
}
