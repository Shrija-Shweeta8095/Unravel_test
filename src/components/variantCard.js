import { useEffect, useRef, useState } from "react";
import Button from '@mui/material/Button';
const VariantCard = ({ variant }) => {
  console.log(variant);
  const videoRef = useRef(null);
  const [showMedia,setShowMedia] = useState(false);
 const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
  const video = videoRef.current;
  if (!video) return;

  const handleCanPlay = () => setIsLoaded(true); // ✅ Update loading state

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    },
    { threshold: 0.6 }
  );

  video.addEventListener("canplaythrough", handleCanPlay); // 👈 Listen here
  observer.observe(video);

  return () => {
    observer.unobserve(video);
    video.removeEventListener("canplaythrough", handleCanPlay); // 👈 Cleanup
  };
}, []);


  return (
    <>
      <section
        className="container d-flex flex-column"
      >
        <div className="container d-flex justify-content-center">
          {
            variant.video_url ?
            <video
            ref={videoRef}
            src={variant.video_url}
            muted
            playsInline
            preload="none"
            style={{ maxHeight: "500px", width: "100%", objectFit: "cover" }}
          >
            Your browser does not support the video tag.
          </video>:
          <img src={variant.image} style={{ maxHeight: "500px", width: "100%", objectFit: "cover" }}/>
          }
        </div>

        <div className="card-body p-3" style={{padding:"20px",border:"1px solid green",marginTop:"-5px",borderRadius:"10px"}}>
          <div className="mb-3 small text-muted" style={{display:"flex",flexDirection:"column",gap:"20px"}}>
            <div style={{display:"flex",gap:"20px"}}>
              <i className="fa-solid fa-mug-hot"></i> <span>{variant.room_name}</span>
            </div>
            <div style={{display:"flex",gap:"20px"}}>
              <i className="fa-solid fa-bed"></i> <span>{variant.bed_type}</span>
            </div>
            <div style={{display:"flex",gap:"20px"}}>
              <i className="fa-solid fa-user"></i> <span>{variant.adult_type}</span>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"10px",padding:"10px 0",fontSize:"13px"}}>
            <div className="d-flex align-items-center small text-muted mb-1">
              <span>Price for 1 night</span>
            </div>
            <div className="d-flex align-items-center small text-secondary mb-2">
              <i className="bi bi-receipt me-2 text-secondary"></i>
              <span>Includes taxes & fees</span>
            </div>

            <div style={{display:"flex",gap:"20px",alignItems:"center"}}>
              <span className="text-decoration-line-through text-muted me-2" style={{textDecoration:"line-through"}}>
                {variant.price.toLocaleString("en-MY", {
                  style: "currency",
                  currency: "MYR",
                })}
              </span>
              <span className="text-decoration-line-through text-muted me-2" style={{fontWeight:"bold"}}>
                {variant.current_price.toLocaleString("en-MY", {
                  style: "currency",
                  currency: "MYR",
                })}
              </span>
              <Button disabled className="text-decoration-line-through text-muted me-2" style={{background:"#214c91",padding:"3px 10px",borderRadius:"10px",color:"white",gap:"5px"}}>
                <span>{(((variant.price - variant.current_price) / variant.price) * 100).toFixed(0)}<i className="fa-solid fa-percent"></i></span>off
              </Button>
            </div>
          </div>
          <Button style={{color:"green",gap:"5px"}}>
            Cancellation Policy <i className="fa-solid fa-greater-than" style={{fontSize:"10px"}}></i>
          </Button>
          <div className="d-flex align-items-center small text-muted mb-3" style={{padding:"10px 0"}}>
            <span>Select rooms to add special request</span>
          </div>

          <Button style={{background:"green",color:"white",width:"100%",borderRadius:"10px"}} className="btn btn-success w-100">
            Select
          </Button>
        </div>

      </section><br/>
    </>
  );
};

export default VariantCard;
