import Image from "next/image";

export default function Summary() {
  return (
    <div className="blockquote">
      <p>
        I am a software engineer at{" "}
        <Image src="/thales.png" alt="Thales" width={127} height={15} /> and I
        provide IT services for individuals and small businesses.
      </p>
      <h2>Services</h2>
      <ul>
        <li>Migration and maintenance to the public cloud.</li>
        <li>
          Set up and maintenance of private clouds, both for business and
          personal use.
        </li>
        <li>Linux server administration.</li>
        <li>Set up and maintenance of Linux workstations.</li>
        <li>
          Web, desktop and mobile applications development and maintenance.
        </li>
      </ul>
    </div>
  );
}
