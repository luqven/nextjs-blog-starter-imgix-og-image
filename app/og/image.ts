import Imgix from "@imgix/js-core";

export const imgixClient = new Imgix({
  domain: process.env.IMGIX_DOMAIN as string,
  includeLibraryParam: false,
});

export const placeholderImage = "purple-gradient-unsplash.jpg";

type OGImageProps = {
  image?: string;
  title?: string;
  description?: string;
  views?: number;
};

/**
 * Constructs a URL for an Open Graph image using imgix with specified properties.
 * @param {OGImageProps} params - The parameters for the image.
 * @param {string} [params.image=placeholderImage] - The image URL or Imgix resource path. If not provided, defaults to a placeholder image.
 * @param {string} [params.title=""] - The title text to be overlaid on the image.
 * @param {string} [params.description=""] - The description text to be overlaid on the image.
 * @param {number} [params.views=0] - The view count to display on the image.
 * @returns {string} The fully constructed Imgix URL for the OG image.
 * @see https://docs.imgix.com/apis/rendering
 */
export const ixOgImage = ({
  image = placeholderImage,
  title = "",
  description = "",
  views = 0,
}: OGImageProps) =>
  imgixClient.buildURL(image, {
    w: 1900,
    h: 1080,
    fit: "crop",
    auto: "compress",
    q: 75,
    mark64: titleTextImage(title),
    "mark-align": "middle,left",
    "mark-pad": 160,
    "mark-y": "-100",
    blend64: bodyTextImage(description),
    "blend-y": 325,
    "blend-align": "middle-left",
    "blend-pad": 160,
    "blend-mode": "normal",
    txt: `${views} views`,
    "txt-size": 62,
    "txt-align": "bottom,right",
    "txt-color": "fff",
    "txt-pad": 160,
  });

export const titleTextImage = (titleText: string) =>
  imgixClient.buildURL("~text", {
    txt64: titleText,
    w: 1200,
    h: 1080,
    "txt-size": 130,
    "txt-color": "fff",
    "txt-align": "middle,left",
    "txt-font": "KaiseiTokumin-Bold",
    bg: "00FFFFFF",
  });

export const bodyTextImage = (bodyText: string) =>
  imgixClient.buildURL("~text", {
    txt64: bodyText,
    w: 1200,
    h: 1080,
    "txt-size": 42,
    "txt-color": "fff",
    "txt-align": "middle,left",
    bg: "00FFFFFF",
  });
