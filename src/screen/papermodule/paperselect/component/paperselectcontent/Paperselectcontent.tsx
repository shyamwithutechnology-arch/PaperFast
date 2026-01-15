import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
    Image,
} from "react-native";
import { styles } from "./styles";
import { Icons } from "../../../../../assets/icons";
if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

// const Paperselectcontent = () => {
//   const [activeId, setActiveId] = useState<number | null>(null);

//   const toggle = (id: number) => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     setActiveId(activeId === id ? null : id);
//   };
// const DATA = [
//   {
//     id: 1,
//     title: "NCERT",
//     content: ["Chapter 1", "Chapter 2", "Chapter 3"],
//   },
//   {
//     id: 2,
//     title: "Exemplar",
//     content: ["Chapter 1", "Chapter 2"],
//   },
//   {
//     id: 3,
//     title: "RD Sharma",
//     content: ["Exercise 1", "Exercise 2", "Exercise 3"],
//   },
// ];

//   return (
//     <View>
//       {DATA.map(item => {
//         const isOpen = activeId === item.id;

//         return (
//           <View key={item.id} style={styles.card}>
//             {/* HEADER BUTTON */}
//             <TouchableOpacity
//               style={styles.header}
//               activeOpacity={0.8}
//               onPress={() => toggle(item.id)}
//             >
//               <Text style={styles.title}>{item.title}</Text>

//               <Image
//                 source={Icons.downArrow}
//                 style={[
//                   styles.arrow,
//                   { transform: [{ rotate: isOpen ? "180deg" : "0deg" }] },
//                 ]}
//               />
//             </TouchableOpacity>

//             {/* EXPAND CONTENT */}
//             {isOpen && (
//               <View style={styles.content}>
//                 {item.content.map((text, index) => (
//                     <View style={styles.innerContent}>
//                   <Text key={index} style={styles.itemText}>
//                     • {text}
//                   </Text>
//                   </View>
//                 ))}
//               </View>
//             )}
//           </View>
//         );
//       })}
//     </View>
//   );
// };
const Paperselectcontent = () => {
    const [activeId, setActiveId] = useState<number | null>(null);

    const toggle = (id: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setActiveId(activeId === id ? null : id);
    };
    const DATA = [
        {
            id: 1,
            title: "Number System",
            chapterName: 'Chap 01',
            content: ["Chapter 1", "Chapter 2", "Chapter 3"],
        },
        {
            id: 2,
            title: "Polynomials",
            content: ["Chapter 1", "Chapter 2"],
            chapterName: 'Chap 02'
        },
        {
            id: 3,
            title: "Coordinate Geometry",
            content: ["Exercise 1", "Exercise 2", "Exercise 3"],
            chapterName: 'Chap 03'
        },
        {
            id: 4,
            title: "Linear Equations in Two Variables",
            content: ["Exercise 1", "Exercise 2", "Exercise 3"],
            chapterName: 'Chap 04    '
        },
        {
            id: 5,
            title: "Introduction to Eucklid Geometry",
            content: ["Exercise 1", "Exercise 2", "Exercise 3"],
            chapterName: 'Chap 04    '
        },
    ];


    const headerButton = [
        {
            id: 1,
            title: "NCERT",
        },
        {
            id: 2,
            title: "Exemplar",
        },
        {
            id: 3,
            title: "RD Sharma",
        },
    ];
    return (
        <View>
            {DATA.map(item => {
                const isOpen = activeId === item.id;

                return (
                    <View key={item.id} style={styles.wrapper}>


                        {/* TITLE BOX */}
                        <TouchableOpacity
                            style={styles.titleBox}
                            activeOpacity={0.8}
                            onPress={() => toggle(item.id)}
                        >
                            <View>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.chaptName}>{item.chapterName}</Text>
                            </View> 
                            <Image
                                source={Icons.downArrow}
                                style={[
                                    styles.arrow,
                                    { transform: [{ rotate: isOpen ? "180deg" : "0deg" }] },
                                ]}
                            />
                        </TouchableOpacity>

                        {/* CONTENT BOX */}
                        {isOpen && (
                            <View style={styles.contentBox}>
                                {item.content.map((text, index) => (
                                    <Text key={index} style={styles.itemText}>
                                        • {text}
                                    </Text>
                                ))}
                            </View>
                        )}

                    </View>
                );
            })}
        </View>
    );
};

export default Paperselectcontent;
