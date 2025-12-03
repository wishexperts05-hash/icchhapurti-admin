import React from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../../components/uiComponent/BreadCrumb";
import PagePath2 from "../../../../components/uiComponent/PagePath2";

import { ChevronRight, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { value: "50K+", label: "Selling Products" },
  { value: "15k+", label: "Satisfied Customers" },
  { value: "10+", label: "Worldwide Honors" },
];

const teamAvatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
];

const AboutUS = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <nav className="border-b border-border px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center gap-2 text-sm">
          <LayoutGrid className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">App Management</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className="text-foreground">View About Us</span>
        </div>
        <div className="mx-auto max-w-6xl">
          <Link to="/" className="text-sm text-amber-500 hover:underline">
            View About Us
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Hero Section */}
        <section className="mb-16 grid gap-8 lg:grid-cols-2">
          <div>
            <h1 className="mb-8 font-serif text-4xl font-medium italic text-foreground lg:text-5xl">
              Quality Items For Every Desk & Every Day.
            </h1>
            
            {/* Team Image */}
            <div className="overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="h-64 w-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            {/* Product Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-lg bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=200&fit=crop"
                  alt="Premium products"
                  className="h-32 w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=200&fit=crop"
                  alt="Team meeting"
                  className="h-32 w-full object-cover"
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>

            {/* Stats */}
            <div className="flex gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {teamAvatars.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt={`Team member ${index + 1}`}
                    className="h-10 w-10 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-amber-400">★</span>
                <span className="font-medium text-foreground">4.8 Customers Ratings</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section>
          <h2 className="font-serif text-3xl font-medium text-foreground">Our Mission</h2>
        </section>
      </main>
    </div>
  );
};

export default AboutUS;

