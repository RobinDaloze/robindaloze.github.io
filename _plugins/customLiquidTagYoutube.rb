module Jekyll
    class YoutubeTag < Liquid::Block
  
      def render(context)
        url = super
        @text = "<iframe width=\"100%\" height=\"100%\" src=\""+url+"\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>"
        "#{@text}"
      end
    end
  end
  
  Liquid::Template.register_tag('youtube', Jekyll::YoutubeTag)