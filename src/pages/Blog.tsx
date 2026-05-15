import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useBlogPageContent, useBlogPosts } from "@/hooks/useContent";

const Blog = () => {
  const { data: blogPage } = useBlogPageContent();
  const { data: posts = [] } = useBlogPosts();
  const [featuredPost, ...secondaryPosts] = posts;

  return (
    <Layout>
      <section className="bg-[#FAF6F1] pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pt-36">
        <div className="container-cafe">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="mb-10 flex flex-col items-start gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <p className="font-sohne text-[0.72rem] uppercase tracking-[0.24em] text-[#C49A3C] sm:text-[0.78rem] sm:tracking-[0.28em]">
                {blogPage?.eyebrow ?? "From the journal"}
              </p>
              <Link
                to="/blog"
                className="group inline-flex shrink-0 font-sohne text-[0.88rem] text-[#8C7B6B] transition-colors duration-300 hover:text-[#C49A3C] sm:text-[0.9rem]"
              >
                <span className="relative">
                  View all posts
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#C49A3C] transition-transform duration-300 group-hover:scale-x-100" />
                </span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-7 lg:grid-cols-[minmax(0,1.38fr)_minmax(0,1fr)]">
              {featuredPost ? (
                <motion.article
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.48 }}
                >
                  <Link to={`/blog/${featuredPost.slug}`} className="group block">
                    <div className="relative overflow-hidden rounded-[10px]">
                      {featuredPost.image ? (
                        <img
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          className="h-[220px] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] sm:h-[240px]"
                        />
                      ) : (
                        <div className="h-[220px] w-full bg-[linear-gradient(135deg,#4A2414_0%,#2A140D_100%)] sm:h-[240px]" />
                      )}
                      <span className="absolute bottom-4 left-4 rounded-full bg-[#C49A3C] px-4 py-2 font-sohne text-[0.72rem] uppercase tracking-[0.2em] text-[#2A140D]">
                        Editor&apos;s pick
                      </span>
                    </div>
                    <div className="pt-8">
                      <p className="font-sohne text-[0.78rem] uppercase tracking-[0.28em] text-[#C49A3C]">
                        {featuredPost.category}
                      </p>
                      <h2 className="mt-4 max-w-xl font-serif text-[1.8rem] leading-tight text-[#2A140D] sm:text-[2rem] md:text-[2.15rem]">
                        {featuredPost.title}
                      </h2>
                      <p className="mt-4 line-clamp-3 max-w-xl font-sohne text-[0.96rem] leading-7 text-[#8C7B6B] sm:mt-5 sm:line-clamp-2 sm:text-[1.03rem] sm:leading-8">
                        {featuredPost.excerpt}
                      </p>
                      <div className="mt-5 flex flex-wrap items-center gap-2 font-sohne text-[0.8rem] text-[#A08870] sm:gap-3 sm:text-[0.83rem]">
                        <span>{new Date(featuredPost.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                        <span>•</span>
                        <span>{featuredPost.readTime}</span>
                      </div>
                      <span className="group/link mt-6 inline-flex items-center gap-2 font-sohne text-[0.92rem] text-[#C49A3C]">
                        <span className="relative">
                          Read article
                          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#C49A3C] transition-transform duration-300 group-hover/link:scale-x-100" />
                        </span>
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ) : null}

              <div className="flex flex-col">
                {secondaryPosts.slice(0, 3).map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * index, duration: 0.42 }}
                    className={index < 2 ? "border-b border-[#EDE3D8]" : ""}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group flex gap-4 py-5 first:pt-0 sm:gap-5"
                    >
                      <div className="h-[74px] w-[74px] shrink-0 overflow-hidden rounded-md bg-[linear-gradient(135deg,#4A2414_0%,#2A140D_100%)] sm:h-20 sm:w-20">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <p className="font-sohne text-[0.72rem] uppercase tracking-[0.22em] text-[#C49A3C] sm:text-[0.78rem] sm:tracking-[0.24em]">
                          {post.category}
                        </p>
                        <h3 className="mt-2 font-serif text-[1.12rem] leading-tight text-[#2A140D] transition-colors duration-300 group-hover:text-[#C49A3C] sm:text-[1.32rem]">
                          {post.title}
                        </h3>
                        <p className="mt-2 font-sohne text-[0.78rem] text-[#A08870] sm:mt-3 sm:text-[0.82rem]">
                          {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} • {post.readTime}
                        </p>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
