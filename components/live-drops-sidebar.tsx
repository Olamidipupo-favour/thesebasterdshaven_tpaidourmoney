"use client"

import React from "react"

export function LiveDropsSidebar() {
  return (
    <div className="sidebar hide active nav">
      <div className="position-relative px-3 w-100 text-center margin-t-10"></div>
      <div className="live-drops-container new-live-drops">
        <div className="py-3 px-2 d-flex align-items-center justify-content-between livedrop-open">
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
        </div>

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
                    src="https://cdn.rillabox.com/media/products/Removal-249_1_1.png"
                  />
                  <img
                    className="live-drop-product hover-img face-img"
                    alt="face image"
                    width="250"
                    height="80"
                    src="https://cdn.rillabox.com/media/boxes/01-STREAMERS_ELITE-Box-mock_box_1.png"
                  />
                </div>
                <div className="sub-text-detail-div">
                  <span className="text-white fw-medium item-title">iShowspeed x Ben - Merch</span>
                  <div>
                    <div className="current-price"><span className="thin-text">$</span><span className="thin-text">18.69</span></div>
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
                  <img className="live-drop-product default-img" alt="live drop product" width="250" height="80" src="https://cdn.rillabox.com/media/products/20_voucher_1.png" />
                  <img className="live-drop-product hover-img face-img" alt="face image" width="250" height="80" src="https://cdn.rillabox.com/media/boxes/Call-of-Duty.png" />
                </div>
                <div className="sub-text-detail-div">
                  <span className="text-white fw-medium item-title">$20 RillaBox Voucher</span>
                  <div>
                    <div className="current-price"><span className="thin-text">$</span><span className="thin-text">20.00</span></div>
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
                  <img className="live-drop-product default-img" alt="live drop product" width="250" height="80" src="https://cdn.rillabox.com/media/products/template-sticker-600x600_2.png" />
                  <img className="live-drop-product hover-img face-img" alt="face image" width="250" height="80" src="https://cdn.rillabox.com/media/boxes/YEEZY-budget-mock_box_Kk7WJkB.png" />
                </div>
                <div className="sub-text-detail-div">
                  <span className="text-white fw-medium item-title">Yeezy Sticker - 350 Blue Tint</span>
                  <div>
                    <div className="current-price"><span className="thin-text">$</span><span className="thin-text">1.99</span></div>
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
                  <img className="live-drop-product default-img" alt="live drop product" width="250" height="80" src="https://cdn.rillabox.com/media/products/2_Voucher_Fotkc1O.png" />
                  <img className="live-drop-product hover-img face-img" alt="face image" width="250" height="80" src="https://cdn.rillabox.com/media/boxes/Logitech.png" />
                </div>
                <div className="sub-text-detail-div">
                  <span className="text-white fw-medium item-title">$2 RillaBox Voucher</span>
                  <div>
                    <div className="current-price"><span className="thin-text">$</span><span className="thin-text">2.00</span></div>
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
                  <img className="live-drop-product default-img" alt="live drop product" width="250" height="80" src="https://cdn.rillabox.com/media/products/removal.ai_60aee5f8-493c-4ef5-9038-ab7cd0a6112f-image_1.png" />
                  <img className="live-drop-product hover-img face-img" alt="face image" width="250" height="80" src="https://cdn.rillabox.com/media/boxes/06-KANYE-Box-mock_box_1.png" />
                </div>
                <div className="sub-text-detail-div">
                  <span className="text-white fw-medium item-title">Kanye West Free Hoover Hat - Red</span>
                  <div>
                    <div className="current-price"><span className="thin-text">$</span><span className="thin-text">72.29</span></div>
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
                  <img className="live-drop-product default-img" alt="live drop product" width="250" height="80" src="https://cdn.rillabox.com/media/products/Remove-bg.ai_1728146176490_1_1.png" />
                  <img className="live-drop-product hover-img face-img" alt="face image" width="250" height="80" src="https://cdn.rillabox.com/media/boxes/02_PATEK_PHILIPPE-Box-mock_box.png" />
                </div>
                <div className="sub-text-detail-div">
                  <span className="text-white fw-medium item-title">Patek Philippe Nautilus Wine Key</span>
                  <div>
                    <div className="current-price"><span className="thin-text">$</span><span className="thin-text">404.49</span></div>
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
