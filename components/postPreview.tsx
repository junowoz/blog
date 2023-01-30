import Link from "next/link";
import { PostMetadata } from "./PostMetadata";

const PostPreview = (props: PostMetadata) => {
    const topicColor = (topic: string) => {
        switch (topic) {
            case "Web3":
                return "text-blue-700";
            case "Economics":
                return "text-green-700";
            case "Mathematics":
                return "text-purple-700";
            case "Physics":
                return "text-orange-700";
            case "Computer Science":
                return "text-teal-700";
            case "Spirituality":
                return "text-indigo-700";
            case "Self-Help":
                return "text-pink-700";
            case "Psychology":
                return "text-brown-700";
            case "General Knowledge":
                return "text-gray-700";
            case "Artificial Intelligence":
                return "text-cyan-700";
            case "Business":
                return "text-red-700";
            case "Design":
                return "text-purple-700";
            default:
                return "text-slate-800";
        }
    };

    return (
        <>
            <Link href={`/posts/${props.slug}`}>
                <div className="border border-slate-300 p-4 rounded-md shadow-sm bg-white hover:bg-slate-100">
                    <p className="text-sm text-slate-400 font-semibold">
                        {props.date}
                    </p>
                    <h2 className="font-semibold text-lg text-slate-800">
                        {props.title}
                    </h2>
                    <p className="text-sm text-slate-500 font-semibold">
                        {props.subtitle}
                    </p>

                    <p className="text-sm text-slate-600 font-semibold">
                        Tema:{" "}
                        <span
                            className={`text-sm font-bold ${topicColor(
                                props.topic
                            )}`}
                        >
                            {props.topic}
                        </span>
                    </p>
                </div>
            </Link>
        </>
    );
};
export default PostPreview;
