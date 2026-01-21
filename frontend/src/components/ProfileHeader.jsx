export default function ProfileHeader({ title, subtitle }) {
  return (
    <div className="profile-header">
      {title && <h1>{title}</h1>}
      {subtitle && <h4>{subtitle}</h4>}
    </div>
  );
}
