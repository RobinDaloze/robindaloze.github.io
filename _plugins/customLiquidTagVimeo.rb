module Jekyll
    class YoutubeTag < Liquid::Block
  
      def render(context)
        url = super
        @text = '<iframe src="'+ url +'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
        "#{@text}"
      end
    end
  end
  
  Liquid::Template.register_tag('youtube', Jekyll::YoutubeTag)