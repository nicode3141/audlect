import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/shared/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Bell, CreditCard, EllipsisVertical, LogOut, UserCircle } from "lucide-react";
import { useSession } from "~/lib/auth-client";
import Link from "next/link";
import { useContext } from "react";
import { AuthUIContext } from "~/lib/auth/auth-ui-provider";
import { usePathname } from "next/navigation";

export function NavUser() {
	const { isMobile } = useSidebar();
	const location = usePathname();

	const {
		basePath,
		hooks: { useSession, useListDeviceSessions },
		mutators: { setActiveSession },
		localization: contextLocalization,
		multiSession,
		account: accountOptions,
		signUp,
		toast,
		viewPaths,
		onSessionChange,
		Link,
		localizeErrors,
	} = useContext(AuthUIContext);

	const { data: sessionData, isPending: sessionPending } = useSession();
	const user = sessionData?.user;

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent dark:data-[state=open]:bg-neutral-700
								data-[state=open]:text-sidebar-accent-foreground dark:data-[state=open]:text-neutral-200"
						>
							<Avatar className="h-8 w-8 rounded-lg grayscale">
								<AvatarImage src={user?.image ?? "/placeholder"} alt={user?.name} />
								<AvatarFallback className="rounded-lg">CN</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{user?.name}</span>
								<span className="truncate text-xs text-muted-foreground">{user?.email}</span>
							</div>
							<EllipsisVertical className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg dark:bg-neutral-700 dark:text-white
							dark:border-neutral-500"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src={user?.image ?? "/ImagePlaceholder"} alt={user?.name} />
									<AvatarFallback className="rounded-lg">CN</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{user?.name}</span>
									<span className="truncate text-xs text-muted-foreground">{user?.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem asChild>
								<Link
									href={`${accountOptions?.basePath}/${accountOptions?.viewPaths?.SETTINGS}?redirectTo=${encodeURIComponent(location)}`}
									className=""
								>
									<UserCircle />
									Account
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Bell />
								Notifications
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<LogOut />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
