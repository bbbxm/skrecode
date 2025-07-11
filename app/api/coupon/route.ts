import { NextResponse } from "next/server";

const couponCodes = [
  "RINKARMA",
  "GUILDWAR",
  "7SENASENA7",
  "GOODLUCK",
  "THANKYOU",
  "LOVELYRUBY",
  "REBIRTHBACK",
  "BONVOYAGE",
  "YONGSANIM",
  "TREASURE",
  "WELCOMEBACK",
  "THEMONTHOFSENA",
  "EVANKARIN",
  "DARKKNIGHTS",
  "SENAHAJASENA",
  "CMMAY",
  "7777777",
  "LOVESENA",
  "INFINITETOWER",
  "UPDATES",
  "SENARAID",
  "SENAEVENTS",
  "SECRETCODE",
  "MAILBOX",
  "YUISSONG",
  "RELEASEPET",
  "MOREKEYS",
  "WELCOMESENA",
  "HEROSOMMON",
  "SENAREGOGO",
  "SHOWMETHEMONEY",
  "PDKIMJUNGKI",
  "INFOCODEX",
  "THEHOLYCROSS",
  "FUSEGETSPECIAL",
  "ADVENTURER ",
  "NOHOSCHRONICLE",
  "VALKYRIE",
  "LEGENDSRAID",
  "STORYEVENT",
  "SURPRISE",
  "INTOTHESENA",
  "FORTAGNIA",
];

export async function POST(request: Request) {
  try {
    const { pid } = await request.json();

    if (!pid) {
      return NextResponse.json(
        { error: "Invalid or empty coupon codes array" },
        { status: 400 }
      );
    }

    const baseUrl = "https://coupon.netmarble.com/api/coupon/reward";
    const staticParams = {
      gameCode: "tskgb",
      langCd: "ZH_CN",
      pid: "73BDEB8CE4074B0D8BAD996B22953795",
    };

    const results = await Promise.all(
      couponCodes.map(async (couponCode: string) => {
        try {
          const url = new URL(baseUrl);
          url.searchParams.append("gameCode", staticParams.gameCode);
          url.searchParams.append("couponCode", couponCode);
          url.searchParams.append("langCd", staticParams.langCd);
          url.searchParams.append("pid", staticParams.pid);

          const response = await fetch(url.toString(), {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();
          return {
            couponCode,
            success: data.httpStatus === 200,
            data: data,
          };
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          return {
            couponCode,
            success: false,
            data: null,
          };
        }
      })
    );

    return NextResponse.json({ results }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
