import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { FormAuth1 } from "../forms/form-auth-1"

export function Auth1({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <div className={cn("flex flex-col gap-6", className)} {...props}>
                    <Card className="overflow-hidden py-0">
                        <CardContent className="grid p-0 md:grid-cols-2">
                            <FormAuth1 />
                            <div className="relative hidden bg-muted md:block">
                                <img
                                    src="/photo-1.jpg"
                                    alt="Image"
                                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                        and <a href="#">Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </div>
    )
}
