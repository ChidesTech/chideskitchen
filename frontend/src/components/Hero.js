export default function Carousel(){
    return  <section className="full-bg video-bg mt-5" >
    <div className="full-bg-overlay black-pat text-center">
      <div className="pat">
        <h2 >CHIDES <span style={{color:"orangered"}} className="highlight">Kitchen</span></h2>
        <p >Prepared by world famous cooks</p>
      </div> 
      <video src="/video/video.mp4" loop autoPlay muted>

      </video>
    </div>
  </section>
   
}