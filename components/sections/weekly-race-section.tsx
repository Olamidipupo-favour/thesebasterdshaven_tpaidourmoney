"use client"

export function WeeklyRaceSection() {
  return (
    <div className="w-100">
      <div className="award-block homepage-awardbanner">
        <div className="award-innerblock">
          <div className="award-gradient position-relative">
            <span className="moving-box1 motion1 top-motionbox">
              <img src="https://rillabox.com/images/box1.png" alt="Box1" className="img-fluid imgshadow" />
            </span>
            <span className="moving-box2 motion1 bottom-motionbox small-box">
              <img src="https://rillabox.com/images/box2.png" alt="Box2" className="img-fluid imgshadow" />
            </span>
            <div className="award-middlebox">
              <div className="row g-xl-0 g-md-3 g-2 align-items-center position-relative">
                <div className="col-xl-8 col-lg-6 col-md-6 col-12">
                  <div className="d-flex align-items-center trophy-boxblock ">
                    <div className="d-lg-flex d-none">
                      <img src="https://rillabox.com/images/trophy-changed.png" alt="" className="trophy-image" />
                    </div>
                    <div>
                      <div className="d-flex flex-wrap gap-17 weeklyrace-header align-items-center">
                        <h5 className="winning-raceamount fw-bold mb-0" title="$10,000">
                          <span className="actual-amount">$10,000</span>
                        </h5>
                        <span className="weekly-racebadge weekly-race-bage fw-semibold">Weekly Race</span>
                      </div>
                      <p className="participated-text fw-medium mt-2">Participate in our Weekly Race simply by playing on RillaBox!</p>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                  <div className="race-block ms-xl-auto ms-auto me-xl-0 me-auto">
                    <h3 className="race-title d-flex align-items-center justify-content-center">
                      <img className="flex-shrink-0" src="https://rillabox.com/images/timer.svg" alt="Timer" />
                    </h3>
                    <div className="d-flex flex-wrap align-items-center justify-content-around timer-block-changed position-relative">
                      <div className="d-flex align-items-center flex-column gap-2">
                        <div className="d-flex gap-1">
                          <div className="race-timer-changed font-26 fw-semibold text-white text-center d-flex align-items-center justify-content-center"><span>0</span></div>
                          <div className="race-timer-changed font-26 fw-semibold text-white text-center d-flex align-items-center justify-content-center"><span>4</span></div>
                        </div>
                        <p className="mb-0 leaderboard-text">Days</p>
                      </div>
                      <div className="d-flex align-items-center flex-column gap-2">
                        <div className="d-flex gap-1">
                          <div className="race-timer-changed font-26 fw-semibold text-white text-center d-flex align-items-center justify-content-center"><span>1</span></div>
                          <div className="race-timer-changed font-26 fw-semibold text-white text-center d-flex align-items-center justify-content-center"><span>5</span></div>
                        </div>
                        <p className="mb-0 leaderboard-text">Hours</p>
                      </div>
                      <div className="d-flex align-items-center flex-column gap-2">
                        <div className="d-flex gap-1">
                          <div className="race-timer-changed font-26 fw-semibold text-white text-center d-flex align-items-center justify-content-center"><span>3</span></div>
                          <div className="race-timer-changed font-26 fw-semibold text-white text-center d-flex align-items-center justify-content-center"><span>6</span></div>
                        </div>
                        <p className="mb-0 leaderboard-text">Minutes</p>
                      </div>
                      <div className="d-flex align-items-center flex-column gap-2">
                        <div className="d-flex gap-1">
                          <div className="race-timer-changed font-26 fw-semibold text-white text-center d-flex align-items-center justify-content-center"><span>1</span></div>
                          <div className="race-timer-changed font-26 fw-semibold text-white text-center d-flex align-items-center justify-content-center"><span>8</span></div>
                        </div>
                        <p className="mb-0 leaderboard-text">Seconds</p>
                      </div>
                      <span className="text-white sale-label">ENDS IN</span>
                    </div>
                    <div className="text-center mt-2">
                      <button type="button" className="outline-btnanimation border-0 w-100 btn btn-link">
                        <span className="d-flex align-items-center justify-content-center gap-2">View Race  
                          <img src="https://rillabox.com/icons/landing/button-right-arrow.svg" alt="right-arroe" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span className="moving-box3 motion1 top-motionbox top-center-motion-box">
              <img src="https://rillabox.com/images/box3.png" alt="Box1" className="img-fluid imgshadow" />
            </span>
            <span className="moving-box4 motion1 bottom-motionbox">
              <img src="https://rillabox.com/images/box4.png" alt="Box2" className="img-fluid imgshadow addidas-box" />
            </span>
            <div className="d-lg-none d-flex align-items-center justify-content-center">
              <img src="https://rillabox.com/images/trophy-changed.png" alt="" className="trophy-image z-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
