import PdfDigitalPhotography from "../Assets/pdfs/digitalphotographydaily.pdf";
import DigitalCPACourse from "../Assets/pdfs/emeraldsdigitalcpa.pdf";
import PdfUiUxDesign from "../Assets/pdfs/emeraldsuiuxdesign.pdf";
import PdfVideoEditing from "../Assets/pdfs/emeraldsvideoediting.pdf";
import EmeraldsWebBeginnerCourse from "../Assets/pdfs/emeraldswebbeginnercourse.pdf";
import EmeraldsWebsoftwareDevelopment from "../Assets/pdfs/emeraldswebsoftwaredevelopment.pdf";
import GraphicDesignCourse from "../Assets/pdfs/graphicdesigncourse.pdf";
import PhotoshopBasicCourse from "../Assets/pdfs/photoshopbasics.pdf";

export const courses: ProductItemType[] = [
    {
        id: "393th-alpj",
        downloadable: PdfDigitalPhotography,
        name: "Digital Photography Essentials",
        description: "Discover the fundamentals and advanced secrets of digital photography for stunning results.",
        category: "Intermediate",
        price: 8000,
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        star: 4,
        cartQuantity: 1,
    },
    {
        id: "03d59254-b182",
        downloadable: EmeraldsWebsoftwareDevelopment,
        name: "Modern Web Development Bootcamp",
        description: "Learn to build robust web applications using the latest technologies and best practices.",
        category: "Beginner",
        price: 10000,
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
        star: 5,
        cartQuantity: 1,
    },
    {
        id: "5f6g7h8i-j0k1",
        downloadable: GraphicDesignCourse,
        name: "Creative Graphic Design Studio",
        description: "Explore graphic design concepts and craft eye-catching visuals for digital and print media.",
        category: "All Levels",
        price: 10000,
        image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80",
        star: 5,
        cartQuantity: 1,
    },
    {
        id: "7bc4dc1e-b39c",
        downloadable: EmeraldsWebBeginnerCourse,
        name: "Blockchain & Web3 Foundations",
        description: "Dive into blockchain technology and Web3, learning to build decentralized applications.",
        category: "Intermediate",
        price: 5000,
        image: "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=400&q=80",
        star: 4,
        cartQuantity: 1,
    },
    {
        id: "d4e5f6g7-h8i9",
        downloadable: DigitalCPACourse,
        name: "Digital CPA & SEO Masterclass",
        description: "Advance your CPA skills for the digital age and boost your marketing with expert SEO techniques.",
        category: "Advanced",
        price: 10000,
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
        star: 5,
        cartQuantity: 1,
    },
    {
        id: "a1b2c3d4-e5f6",
        downloadable: PhotoshopBasicCourse,
        name: "Photoshop Basics Crash Course",
        description: "Get started with Adobe Photoshop and learn essential tools for photo editing and graphic creation.",
        category: "Beginner",
        price: 6500,
        image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        star: 4,
        cartQuantity: 1,
    },
    {
        id: "e5f6g7h8-i9j0",
        downloadable: PdfVideoEditing,
        name: "Video Production & Content Creation Lab",
        description: "Master video editing and content creation to produce captivating media for any platform.",
        category: "All Levels",
        price: 25000,
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
        star: 4,
        cartQuantity: 1,
    }, {
        id: "f6g7h8i9-j0k1",
        downloadable: PdfUiUxDesign,
        name: "UI/UX Design Mastery",
        description: "Learn to design seamless user interfaces and experiences for modern digital products.",
        category: "All Levels",
        price: 10000,
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
        star: 4,
        cartQuantity: 5,
    }
];
