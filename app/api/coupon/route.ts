import { NextResponse } from "next/server";

const couponCodes = [
  "RINKARMA",
  "SECRETCODE",
  "777SENARE",
  "JJOLJACK",
  "LOVESENA",
  "SENAREGOGO",
  "GOODLUCK",
  "SEVENVSDARK",
  "7777777",
  "SURPRISE",
  "THEMONTHOFSENA",
  "7SENASENA7",
  "INTOTHESENA",
  "REBIRTHBACK",
  "WELCOMEBACK",
  "BLINGBLING",
  "LODING",
  "GUILDWAR",
  "HEROSOMMON",
  "INFOCODEX",
  "BONVOYAGE",
  "INFINITETOWER",
  "STORYEVENT",
  "EVANKARIN",
  "SENARAID",
  "WELCOMESENA",
  "MOONLIGHTCOAST",
  "MOREKEYS",
  "SHOWMETHEMONEY",
  "MAILBOX",
  "RELEASEPET",
  "NOHOSCHRONICLE",
  "UPDATES",
  "THANKYOU",
  "SENAHAJASENA",
  "FORTAGNIA",
  "YUISSONG",
  "YONGSANIM",
  "PUKIDANCE",
  "ADVENTURER",
  "LEGENDSRAID",
  "SHININGPRISM",
  "HTRIBERANES",
  "SADENDING",
  "TREASURE",
  "THEHOLYCROSS",
  "VALKYRIE",
  "LOVELYRUBY",
  "SENAEVENTS",
  "CMMAY",
  "PDKIMJUNGKI",
  "FUSEGETSPECIAL",
  "DARKKNIGHTS",
  "JULYSENAMONTH",
  "CUTEECHO",
  "ILOVEPICKUP",
  "SKYGATE",
  "NOMARLHERO",
  "LETSDOSNEA",
  "RANKUPGOGO",
  "DAILYMISSIONS",
  "SENA7SENA",
  "BESTGUILD",
  "PEPEPOPO",
  "PROFILE",
  "GACHAGETCHA",
  "SENAARENA",
  "PETEGG",
  "COMINGSOONPLATIN",
  "MAYSLETTER",
  "HOTCOSTUME",
  "CHECKSTORAGE",
  "DEVELOPERNOTES",
  "POWERUPHERO",
  "ARENAGOLD",
  "POOKIHAPPY",
  "RAREHERO",
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

    // const results = await Promise.all(
    //   couponCodes.reverse().map(async (couponCode: string) => {
    //     try {
    //       const response = await fetch(baseUrl, {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           ...staticParams,
    //           couponCode: couponCode,
    //         }),
    //       });

    //       const data = await response.json();
    //       return {
    //         couponCode,
    //         success: data.errorCode === 200,
    //         data: data,
    //       };
    //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     } catch (error) {
    //       return {
    //         couponCode,
    //         success: false,
    //         data: null,
    //       };
    //     }
    //   })
    // );

    const results = [];

    for (const couponCode of couponCodes.reverse()) {
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
        results.push({
          couponCode,
          success: data.errorCode === 200,
          data: data,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        results.push({
          couponCode,
          success: false,
          data: null,
        });
      }

      // Wait for 1 second before the next request
      // await new Promise((resolve) => setTimeout(resolve, 500));
    }

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
