import "../styles/instagramHome.css";
import TopNavbar from "./TopNavbar";
import StoriesScroller from "./StoriesScroller";
import CreatePost from "./CreatePost";
import HomeFeed from "./HomeFeed";
import BottomNav from "./BottomNav";




export default function HomePage() {
  return (
    <div className="homepage">
      
      <StoriesScroller/>
    
      <HomeFeed/>
      
      
   
      
    </div>
  );
}
