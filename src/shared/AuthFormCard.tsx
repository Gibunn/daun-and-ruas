import Image from "next/image";

export default function AuthFormCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-125 p-12 rounded-3xl bg-white border border-[#E1E5E1]">
      <div className="flex items-center justify-center">
        <Image
          width={193}
          height={30}
          alt="Company logo"
          src="/company-logo.svg"
        />
      </div>
      {children}
    </div>
  );
}
