"use client"

import React from "react"

export function LiveDropsSidebar() {
  return (
    <div className="sidebar hide active nav fixed left-0 top-0" style={{ position: "fixed", top: 0, left: 0, zIndex: 40, height: "100vh" } as React.CSSProperties}>
      <div className="position-relative px-3 w-100 text-center margin-t-10"></div>
      <div className="live-drops-container new-live-drops h-[100vh] overflow-y-auto pr-2">
        {/* <div className="py-3 px-2 d-flex align-items-center justify-content-between livedrop-open">
          <div className="d-flex align-items-center justify-content-start gap-2 w-50 flex-shrink-1">
            <div className="mystery-background d-flex align-items-center justify-content-center">
              <img src="/icons/landing/user-aside.svg" alt="user-icon" />
            </div>
            <div className="livedrop-text">
              <h3 className="text-white m-0">993,881</h3>
              <p className="text-white m-0">Users</p>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-end flex-grow-1 gap-2 w-50 ">
            <div className="mystery-background d-flex align-items-center justify-content-center">
              <img src="/icons/landing/mysterybox-aside.svg" alt="mysterybox-icon" />
            </div>
            <div className="livedrop-text">
              <h3 className="text-white m-0">3,917,122</h3>
              <p className="text-white m-0">Boxes Opened</p>
            </div>
          </div>
        </div> */}

        <div className="live-border my-2">
          <div className="title-container ">
            <span className="live-dropsign m-0"></span>
            <h1 className=" text-white fw-semibold m-0">LIVE DROPS</h1>
          </div>
        </div>

        <div className="livedrops-boxes">
          {/* Item 1 */}
          <div
            className="anim-box inline-block"
            style={{
              // @ts-ignore custom property
              "--badge-color": "#6F6868",
              padding: "1px",
              borderRadius: "12px",
              display: "inline-block",
            } as React.CSSProperties}
          >
            <div
              className="live-drop"
              style={{
                background: "rgb(17, 17, 17)",
                borderRadius: "12px",
                padding: "10px",
                height: "60px",
              }}
            >
              <div className="svg-container"><div className="svg-blur"></div></div>
              <div className="live-drop-main-div">
                <div className="img-live-drop">
                  <img
                    className="live-drop-product default-img"
                    alt="live drop product"
                    width="250"
                    height="80"
                    src="https://cdn.rillabox.com/media/products/Remove-bg.ai_1733411712391_1_1.png"
                  />
                  <img
                    className="live-drop-product hover-img face-img"
                    alt="face image"
                    width="250"
                    height="80"
                    src="https://cdn.rillabox.com/media/boxes/09_BEARBRICK-Box-mock_box_1.png"
                  />
                </div>
                <div className="sub-text-detail-div">
                  <span className="text-white fw-medium item-title">Bearbrick Handheld Mini Fan</span>
                  <div>
                    <div className="current-price"><span className="thin-text">$</span><span className="thin-text">10.99</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div id="container-stars"><div id="stars"></div></div>
            <div id="glow"><div className="circle"></div><div className="circle"></div></div>
          </div>

          {/* Item 2 */}
          <div className="">
            <div
              className="live-drop"
              style={{
                background: "linear-gradient(to right, rgb(82, 202, 25), rgb(0, 0, 0) 100%)",
                borderRadius: "12px",
                padding: "10px",
                height: "60px",
              }}
            >
              <div className="svg-container"><div className="svg-blur"></div></div>
              <div className="live-drop-main-div">
                <div className="img-live-drop">
                  <img className="live-drop-product default-img" alt="live drop product" width="250" height="80" src="https://cdn.rillabox.com/media/products/removal.ai_d4266830-5844-438d-affa-c4c49f789ef3-fsfds_1.png" />
                  <img className="live-drop-product hover-img face-img" alt="face image" width="250" height="80" src="https://cdn.rillabox.com/media/boxes/09_SUBARU-Box-mock_box_1.png" />
                </div>
                <div className="sub-text-detail-div">
                  <span className="text-white fw-medium item-title">Balenciaga Men's BB Monogram Swimming Shorts - Black</span>
                  <div>
                    <div className="current-price"><span className="thin-text">$</span><span className="thin-text">759.99</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="">
            <div
              className="live-drop"
              style={{
                background: "linear-gradient(to right, rgb(111, 104, 104), rgb(0, 0, 0) 100%)",
                borderRadius: "12px",
                padding: "10px",
                height: "60px",
              }}
            >
              <div className="svg-container"><div className="svg-blur"></div></div>
              <div className="live-drop-main-div">
                <div className="img-live-drop">
                  <img className="live-drop-product default-img" alt="live drop product" width="250" height="80" src="https://cdn.rillabox.com/media/products/Remove-bg.ai_1753369461908_1.png" />
                  <img className="live-drop-product hover-img face-img" alt="face image" width="250" height="80" src="https://cdn.rillabox.com/media/boxes/01_SURVIVAL-Box-mock_box_1.png" />
                </div>
                <div className="sub-text-detail-div">
                  <span className="text-white fw-medium item-title">First Aid Kit Sticker</span>
                  <div>
                    <div className="current-price"><span className="thin-text">$</span><span className="thin-text">0.09</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Item 4 */}
          <div className="">
            <div
              className="live-drop"
              style={{
                background: "linear-gradient(to right, rgb(111, 104, 104), rgb(0, 0, 0) 100%)",
                borderRadius: "12px",
                padding: "10px",
                height: "60px",
              }}
            >
              <div className="svg-container"><div className="svg-blur"></div></div>
              <div className="live-drop-main-div">
                <div className="img-live-drop">
                  <img className="live-drop-product default-img" alt="live drop product" width="250" height="80" src="https://cdn.rillabox.com/media/products/Removal-433_1_pdFwbIZ.png" />
                  <img className="live-drop-product hover-img face-img" alt="face image" width="250" height="80" src="https://cdn.rillabox.com/media/boxes/08-RAZER-Box-mock_box.png" />
                </div>
                <div className="sub-text-detail-div">
                  <span className="text-white fw-medium item-title">Razer Firefly V2</span>
                  <div>
                    <div className="current-price"><span className="thin-text">$</span><span className="thin-text">66.99</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Item 5 */}
          <div className="">
            <div
              className="live-drop"
              style={{
                background: "linear-gradient(to right, rgb(82, 202, 25), rgb(0, 0, 0) 100%)",
                borderRadius: "12px",
                padding: "10px",
                height: "60px",
              }}
            >
              <div className="svg-container"><div className="svg-blur"></div></div>
              <div className="live-drop-main-div">
                <div className="img-live-drop">
                  <img className="live-drop-product default-img" alt="live drop product" width="250" height="80" src="https://cdn.rillabox.com/media/products/Remove-bg.ai_1757252557587_1_1.png" />
                  <img className="live-drop-product hover-img face-img" alt="face image" width="250" height="80" src="https://cdn.rillabox.com/media/boxes/Off-White-deluxe-mock_box.png" />
                </div>
                <div className="sub-text-detail-div">
                  <span className="text-white fw-medium item-title">Off-White Black Jitney Quote Card Case - Black</span>
                  <div>
                    <div className="current-price"><span className="thin-text">$</span><span className="thin-text">299.99</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Item 6 */}
          <div className="">
            <div
              className="live-drop"
              style={{
                background: "linear-gradient(to right, rgb(111, 104, 104), rgb(0, 0, 0) 100%)",
                borderRadius: "12px",
                padding: "10px",
                height: "60px",
              }}
            >
              <div className="svg-container"><div className="svg-blur"></div></div>
              <div className="live-drop-main-div">
                <div className="img-live-drop">
                  <img className="live-drop-product default-img" alt="live drop product" width="250" height="80" src="https://cdn.rillabox.com/media/products/1_Voucher.png" />
                  <img className="live-drop-product hover-img face-img" alt="face image" width="250" height="80" src="https://cdn.rillabox.com/media/boxes/GUCCI-budget-mock_box.png" />
                </div>
                <div className="sub-text-detail-div">
                  <span className="text-white fw-medium item-title">$1 RillaBox Voucher</span>
                  <div>
                    <div className="current-price"><span className="thin-text">$</span><span className="thin-text">1.00</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
