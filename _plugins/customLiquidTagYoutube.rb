module Jekyll
    class YoutubeTag < Liquid::Tag
  
      def initialize(tag_name, url, tokens)
        super
        @text = "<iframe width=\"100%\" height=\"100%\" src=\"https://www.youtube.com/embed/"+url+"\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
      end
  
      def render(context)
        "#{@text}"
      end
    end
  end
  
  Liquid::Template.register_tag('youtube', Jekyll::YoutubeTag)