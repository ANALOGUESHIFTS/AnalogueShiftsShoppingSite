import ManagementPageDetails from "../components/Management/PageDetails";

export const metadata = {
  title: "Admin Dashboard | Cinnamon19Fashion",
  description:
    "Welcome to the Admin Dashboard of Cinnamon19Fashion, your command center for managing and optimizing your online fashion empire. Dive into a user-friendly interface designed for efficiency and control. From inventory management to order processing, track real-time analytics and stay ahead of trends. Our Admin Dashboard empowers you to curate the perfect shopping experience for your customers. Have a question or need support? Our resources are at your fingertips. Thank you for choosing Cinnamon19Fashion – where the Admin Dashboard is your key to shaping a stylish and successful online presence.",
  openGraph: {
    title: "Admin Dashboard | Cinnamon19Fashion",
    description:
      "Welcome to the Admin Dashboard of Cinnamon19Fashion, your command center for managing and optimizing your online fashion empire. Dive into a user-friendly interface designed for efficiency and control. From inventory management to order processing, track real-time analytics and stay ahead of trends. Our Admin Dashboard empowers you to curate the perfect shopping experience for your customers. Have a question or need support? Our resources are at your fingertips. Thank you for choosing Cinnamon19Fashion – where the Admin Dashboard is your key to shaping a stylish and successful online presence.",
    url: "https://cinnamon19fashion.com/en/management",
    siteName: "Cinnamon19Fashion",
    images: ["https://cinnamon19fashion.com/images/ceo.jpg"],
    locale: "en_US",
    type: "website",
    alternates: {
      canonical: "https://cinnamon19fashion.com/en/management",
    },
  },
};

export default function Page() {
  return <ManagementPageDetails />;
}
