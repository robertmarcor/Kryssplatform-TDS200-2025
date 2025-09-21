import { ScrollView } from "react-native";

export const scrollToInput = (scrollViewRef: React.RefObject<ScrollView | null>) => {
  scrollViewRef.current?.scrollTo({ y: 300, animated: true });
};
