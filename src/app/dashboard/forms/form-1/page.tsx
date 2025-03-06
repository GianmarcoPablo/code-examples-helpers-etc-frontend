import { Form1 } from "@/components/features/forms/form-1"
import { Form1Preview } from "@/components/features/forms/form-1-preview"

const page = () => {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div>
                <Form1 />
            </div>
            <div>
                <Form1Preview />
            </div>
        </div>
    )
}

export default page