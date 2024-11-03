import { getExistingSlugs } from "../services/gistService.mjs";
import slugify from "slugify";

const createUniqueSlug = async (title,type) => {
    let slug = slugify(title);
    let uniqueSlug = slug;
    let count = 1;
    while ( (await getExistingSlugs(uniqueSlug,type)).length !=0) {
      uniqueSlug = `${slug}-${count}`;
      count++;
    }
    return uniqueSlug;
}
const analyticsToViewsAndUpvotes = (analytics) =>{
  return {
    views: analytics.views,
    upvotes: analytics.voting.upvotes,
    downvotes: analytics.voting.downvotes
  }
}

export default {
  analyticsToViewsAndUpvotes,
  createUniqueSlug
}

