const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const router = express.Router();

router.get("/api/igdl", async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({
      status: 400,
      message: "Masukkan URL Instagram yang akan diunduh!"
    });
  }

  try {
    const result = await igdl(url);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: "Terjadi kesalahan dalam mengunduh konten dari Instagram."
    });
  }
});

async function igdl(url) {
  let res = await axios("https://indown.io/");
  let _$ = cheerio.load(res.data);
  let referer = _$("input[name=referer]").val();
  let locale = _$("input[name=locale]").val();
  let _token = _$("input[name=_token]").val();
  let { data } = await axios.post(
    "https://indown.io/download",
    new URLSearchParams({
      link: url,
      referer,
      locale,
      _token,
    }),
    {
      headers: {
        cookie: res.headers["set-cookie"].join("; "),
      },
    }
  );
  let $ = cheerio.load(data);
  let result = [];
  let __$ = cheerio.load($("#result").html());
  __$("video").each(function () {
    let $$ = $(this);
    result.push({
      type: "video",
      thumbnail: $$.attr("poster"),
      url: $$.find("source").attr("src"),
    });
  });
  __$("img").each(function () {
    let $$ = $(this);
    result.push({
      type: "image",
      url: $$.attr("src"),
    });
  });

  return result;
}

module.exports = router;
