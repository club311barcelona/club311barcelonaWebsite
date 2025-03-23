import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight, ArrowLeft } from "lucide-react";
import Navbar from "@/components/navbar";
import { GradientText } from "@/components/gradient-text";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";

// Import the blog posts data
import blogPosts from "@/app/data/blogpostsarticles";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    return {
      title: "Post Not Found | Club 311 Blog",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | Club 311 Blog`,
    description: post.excerpt,
    keywords: `cannabis, Barcelona, social club, ${post.title.toLowerCase()}, Club 311`,
  };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-charcoal">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="mb-6 font-playfair text-3xl font-bold text-white">Post Not Found</h1>
          <p className="mb-8 text-white/80">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="text-gold hover:underline">
            Return to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-charcoal text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          <div className="h-full w-full bg-[url('/noise.png')] bg-repeat opacity-10"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-gold transition-all duration-300 hover:translate-x-[-5px]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gold" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-gold" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4 text-gold" />
                {post.author}
              </span>
            </div>

            <h1 className="mb-8 font-playfair text-3xl font-bold text-white md:text-4xl lg:text-5xl">{post.title}</h1>

            <div className="relative mb-10 h-[400px] w-full overflow-hidden rounded-2xl">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
            </div>

            <div className="prose prose-lg prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            <div className="mt-12 border-t border-white/10 pt-8">
              <h3 className="mb-4 font-playfair text-xl font-bold text-white">Share this article</h3>
              <div className="flex gap-4">
                <button className="rounded-md bg-white/10 px-4 py-2 text-white transition-colors hover:bg-white/20">
                  Facebook
                </button>
                <button className="rounded-md bg-white/10 px-4 py-2 text-white transition-colors hover:bg-white/20">
                  Twitter
                </button>
                <button className="rounded-md bg-white/10 px-4 py-2 text-white transition-colors hover:bg-white/20">
                  LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 font-playfair text-2xl font-bold text-white">
            Related <GradientText className="from-gold to-gold-light">Articles</GradientText>
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts
              .filter((p) => p.id !== post.id)
              .slice(0, 3)
              .map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="group overflow-hidden rounded-2xl border border-white/5 bg-black/20 backdrop-blur-sm transition-all duration-300 hover:border-gold/20"
                >
                  <Link href={`/blog/${relatedPost.slug}`} className="block">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 font-playfair text-lg font-bold text-white transition-colors duration-300 group-hover:text-gold">
                        {relatedPost.title}
                      </h3>
                      <p className="mb-4 text-sm text-white/70 line-clamp-2">{relatedPost.excerpt}</p>
                      <span className="flex items-center gap-1 text-sm font-medium text-gold transition-all duration-300 group-hover:translate-x-1">
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
          </div>
        </div>
      </section>

      <Newsletter />

      <Footer />
    </main>
  );
}