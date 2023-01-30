import fs from "fs"; //This line imports the built-in "fs" (file system) module from Node.js, which allows interaction with the file system.
import matter from "gray-matter";
import { PostMetadata } from "@/components/PostMetadata";

//Helper function that reads the files in a folder called "posts"
const getPostMetadata = (): PostMetadata[] => {
    // This variable sets the path of the directory that the program is going to read.
    // "posts" is the folder name where the files should be located.
    const folder = "posts/";

    //This line uses the "readdirSync" method from the "fs" module to read all the files in the folder specified by the "folder" variable.
    //The "readdirSync" method returns an array of all the file names in the folder.
    const files = fs.readdirSync(folder);

    // This line filters the array of files that only contain the ".md" extension.
    //The "filter()" method is used and it receives a callback function that checks if the file name ends with ".md".
    //It returns a new array with only the files that pass the test.
    const markdownPosts = files.filter((file) => file.endsWith(".md"));

    //this line is mapping the array markdownPosts, and replacing the .md extension for an empty string, resulting in an array of slugs.
    const posts = markdownPosts.map((fileName) => {
        const fileContents = fs.readFileSync(`posts/${fileName}`, "utf8");
        const matterResult = matter(fileContents);
        return {
            title: matterResult.data.title,
            date: matterResult.data.date,
            subtitle: matterResult.data.subtitle,
            topic: matterResult.data.topic,
            slug: fileName.replace(".md", ""),
        };
    });

    return posts;
};

export default getPostMetadata;
