

import { AppSidebar } from "@/components/features/layout/AppSidebar";
import { NavUser } from "@/components/features/layout/NavUser";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { ToggleTheme } from "@/components/ui/toggle-theme";

const user = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Input placeholder="Search..." />
                    </div>
                    <div className="flex items-center gap-2">
                        <NavUser user={user} />
                        <ToggleTheme />
                    </div>
                </header>
                <div className="gap-6 py-4 px-16 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
