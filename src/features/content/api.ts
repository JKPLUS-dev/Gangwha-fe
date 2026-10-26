import { EXHIBITIONS, FESTIVALS, PRODUCER_STORIES, PROMO_VIDEOS, QUICK_CATEGORIES } from "./data";

export async function getQuickCategories() {
  return QUICK_CATEGORIES;
}
export async function getExhibitions() {
  return EXHIBITIONS;
}
export async function getPromoVideos() {
  return PROMO_VIDEOS;
}
export async function getFestivals() {
  return FESTIVALS;
}
export async function getProducerStories() {
  return PRODUCER_STORIES;
}
