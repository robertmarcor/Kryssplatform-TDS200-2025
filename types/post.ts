import { ImageURISource } from "react-native";

export type Post = {
  title: string;
  body: string;
  tags: string[];
  id: number;
  image: ImageURISource;
};
