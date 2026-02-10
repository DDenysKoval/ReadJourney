import type React from "react";

interface DashboardProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
  return (
    <section>
      <div className="container">
        <div className="w-full bg-middle-gray rounded-[30px] p-5 md:p-8 lg:p-5 lg:pt-10">
          {children}
        </div>
      </div>
    </section>
  );
}
