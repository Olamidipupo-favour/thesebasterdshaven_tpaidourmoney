"use client"

import React, { useEffect, useMemo, useState } from "react"
import liveDropsData from "@/data/live-drops.json"

export function LiveDropsSidebar() {
  type LiveDrop = {
    id: string
    title: string
    price: number
    productImg: string
    boxImg: string
    bg: string
    badgeColor?: string
  }

  const allDrops: LiveDrop[] = (liveDropsData as unknown as LiveDrop[])

  const [displayDrops, setDisplayDrops] = useState<LiveDrop[]>([])

  const sampleSeven = (items: LiveDrop[]) => {
    const arr = [...items]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr.slice(0, 7)
  }

  useEffect(() => {
    setDisplayDrops(sampleSeven(allDrops))
    const id = setInterval(() => setDisplayDrops(sampleSeven(allDrops)), 12000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="sidebar hide active nav fixed left-0 top-0" style={{ position: "fixed", top: 0, left: 0, zIndex: 40, height: "100vh" } as React.CSSProperties}>
      <div className="position-relative px-3 w-100 text-center margin-t-10"></div>
      <div className="live-drops-container new-live-drops h-[100vh] overflow-y-auto pr-2">
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
          {displayDrops.map((drop, idx) => {
            const item = (
              <div className="live-drop" style={{ background: drop.bg, borderRadius: "12px", padding: "10px", height: "60px" }}>
                <div className="svg-container"><div className="svg-blur"></div></div>
                <div className="live-drop-main-div">
                  <div className="img-live-drop">
                    <img className="live-drop-product default-img" alt="live drop product" width={250} height={80} src={drop.productImg} />
                    <img className="live-drop-product hover-img face-img" alt="face image" width={250} height={80} src={drop.boxImg} />
                  </div>
                  <div className="sub-text-detail-div">
                    <span className="text-white fw-medium item-title">{drop.title}</span>
                    <div>
                      <div className="current-price"><span className="thin-text">$</span><span className="thin-text">{drop.price.toFixed(2)}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )

            if (idx === 0) {
              return (
                <div
                  key={drop.id}
                  className="anim-box inline-block"
                  style={{
                    // @ts-ignore custom property
                    "--badge-color": drop.badgeColor || "#6F6868",
                    padding: "1px",
                    borderRadius: "12px",
                    display: "inline-block",
                  } as React.CSSProperties}
                >
                  {item}
                  <div id="container-stars"><div id="stars"></div></div>
                  <div id="glow"><div className="circle"></div><div className="circle"></div></div>
                </div>
              )
            }

            return <div key={drop.id}>{item}</div>
          })}
        </div>
      </div>
    </div>
  )
}
