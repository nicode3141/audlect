import React, { type ReactNode } from "react";

export const Gray = ({ children }: { children: ReactNode | ReactNode[] }) => {
	return <span className="text-secondaryGray">{children}</span>;
};
