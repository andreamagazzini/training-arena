import Link from "next/link";

interface NavbarItemProps {
  label: string;
  to: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, to }) => {
  return (
    <Link href={to}>
      <div
        className="
        text-white
        cursor-pointer
        hover:text-gray-300
        transition
      "
      >
        {label}
      </div>
    </Link>
  );
};

export default NavbarItem;
