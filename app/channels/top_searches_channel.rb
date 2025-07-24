class TopSearchesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "top_searches"
  end
end
