
-- Create a table for tools
CREATE TABLE public.tools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  website_url TEXT,
  tags TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  notes TEXT,
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure only authenticated users can access tools
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own tools
CREATE POLICY "Users can view their own tools" 
  ON public.tools 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own tools
CREATE POLICY "Users can create their own tools" 
  ON public.tools 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own tools
CREATE POLICY "Users can update their own tools" 
  ON public.tools 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to DELETE their own tools
CREATE POLICY "Users can delete their own tools" 
  ON public.tools 
  FOR DELETE 
  USING (auth.uid() = user_id);
