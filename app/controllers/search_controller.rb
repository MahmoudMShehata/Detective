class SearchController < ApplicationController
  def index
  end

  def create
    ip = request.remote_ip
    query = params[:query]

    # Save only if it's not a prefix of a previously stored query
    previous_query = SearchQuery.where(ip_address: ip).order(created_at: :desc).first

    if previous_query.nil? || !query.start_with?(previous_query.query)
      SearchQuery.create(query: query.strip, ip_address: ip)
    end

    head :ok
  end
end
