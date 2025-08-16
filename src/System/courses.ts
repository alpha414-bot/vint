import DigitalCPACourse from "../Assets/pdfs/emeraldsdigitalcpa.pdf";
import EmeraldsillustratedGraphicCourse from "../Assets/pdfs/emeraldsillustratedgraphiccourse.pdf";
import PdfUiUxDesign from "../Assets/pdfs/emeraldsuiuxdesign.pdf";
import PdfVideoEditing from "../Assets/pdfs/emeraldsvideoediting.pdf";
import EmeraldsWebBeginnerCourse from "../Assets/pdfs/emeraldswebbeginnercourse.pdf";
import EmeraldsWebsoftwareDevelopment from "../Assets/pdfs/emeraldswebsoftwaredevelopment.pdf";



export const courses: ProductItemType[] = [
    {
        id: "03d59254-b182",
        downloadable: EmeraldsWebsoftwareDevelopment,
        name: "Web Software Development",
        description: "Learn the fundamentals of web development with a focus on modern technologies and best practices.",
        category: "Beginner",
        price: 10000,
        image: "https://images.unsplash.com/photo-1649451844859-fdd73bf10f04?auto=format&fit=crop&w=400&q=80",
        star: 5,
        cartQuantity: 1,
    },
    {
        id: "7bc4dc1e-b39c",
        downloadable: EmeraldsWebBeginnerCourse,
        name: "Web3 Beginner Course",
        description: "A comprehensive introduction to Web3 technologies and their applications.",
        category: "Intermediate",
        price: 5000,
        image: "https://images.unsplash.com/photo-1672911640671-65d5dfa97d26?auto=format&fit=crop&w=400&q=80",
        star: 4,
        cartQuantity: 1,
    },
    {
        id: "9535be98-df7e",
        downloadable: EmeraldsillustratedGraphicCourse,
        name: "Illustrated Graphic",
        description: "Learn the principles of graphic design and how to create stunning visuals.",
        category: "All Levels",
        price: 15000,
        image: "https://images.unsplash.com/photo-1684503830683-108f3e0fd03f?auto=format&fit=crop&w=400&q=80",
        star: 5,
        cartQuantity: 1,
    },
    {
        id: "d4e5f6g7-h8i9",
        downloadable: DigitalCPACourse,
        name: "Digital CPA & SEO Marketing Course",
        description: "Master the skills needed to become a Certified Public Accountant in the digital age.",
        category: "Advanced",
        price: 10000,
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=400&q=80",
        star: 5,
        cartQuantity: 1,
    }, {
        id: "e5f6g7h8-i9j0",
        downloadable: PdfVideoEditing,
        name: "Content Creating and Video Editing",
        description: "Learn how to create engaging content and edit videos like a pro.",
        category: "All Levels",
        price: 25000,
        image: "https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?auto=format&fit=crop&w=400&q=80",
        star: 4,
        cartQuantity: 1,
    }, {
        id: "f6g7h8i9-j0k1",
        downloadable: PdfUiUxDesign,
        name: "UI/UX Design",
        description: "Learn the principles of UI/UX design and how to create user-friendly interfaces.",
        category: "All Levels",
        price: 10000,
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=400&q=80",
        star: 4,
        cartQuantity: 5,
    }
];
