import connectDB from '@/lib/db';
import Blog from '@/models/Blog';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { slug } = await params;
    const blog = await Blog.findOneAndUpdate(
      { slug, status: 'published' },
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('author', 'name avatar')
      .populate('category', 'name slug');

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    // Fetch related blogs in same category
    const related = await Blog.find({
      category: blog.category._id,
      _id: { $ne: blog._id },
      status: 'published',
    })
      .populate('author', 'name avatar')
      .populate('category', 'name slug')
      .limit(3);

    return NextResponse.json({ blog, related });
  } catch (error) {
    console.error('Get blog error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { slug } = await params;
    const body = await req.json();
    const blog = await Blog.findOneAndUpdate({ slug }, body, { new: true, runValidators: true });
    if (!blog) return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    return NextResponse.json({ blog });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { slug } = await params;
    const blog = await Blog.findOneAndDelete({ slug });
    if (!blog) return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
