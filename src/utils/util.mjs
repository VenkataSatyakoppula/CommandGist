import { getExistingSlugs } from "../services/gistService.mjs";
import slugify from "slugify";

export const createUniqueSlug = async (title) => {
    let slug = slugify(title);
    let uniqueSlug = slug;
    let count = 1;
    while ( (await getExistingSlugs(uniqueSlug)).length !=0) {
      uniqueSlug = `${slug}-${count}`;
      count++;
    }
    return uniqueSlug;
}


