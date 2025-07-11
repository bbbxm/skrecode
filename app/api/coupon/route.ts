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
  "ADVENTURER",
  "NOHOSCHRONICLE",
  "VALKYRIE",
  "LEGENDSRAID",
  "STORYEVENT",
  "SURPRISE",
  "INTOTHESENA",
  "FORTAGNIA",
  "JJOLJACK",
  "PUKIDANCE",
  "777SENARE",
  "SEVENVSDARK",
  "HTRIBERANES",
  "JULYSENAMONTH",
  "LODING",
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

    console.log("pid", pid);

    const baseUrl = "https://coupon.netmarble.com/api/coupon";
    const staticParams = {
      gameCode: "tskgb",
      langCd: "ZH_CN",
      pid: pid,
    };

    const results = await Promise.all(
      couponCodes.reverse().map(async (couponCode: string) => {
        try {
          const response = await fetch(baseUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...staticParams,
              couponCode: couponCode,
            }),
          });

          const data = await response.json();
          return {
            couponCode,
            success: data.errorCode === 200,
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
