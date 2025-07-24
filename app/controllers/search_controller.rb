class SearchController < ApplicationController
  def index
  end

  def create
    ip = request.remote_ip
    query = params[:query]&.strip

    return head :ok if query.blank?

    new_query = SearchQuery.create(query: query, ip_address: ip)

    # Fetch all distinct queries ordered by length (longer ones first)
    all_queries = SearchQuery.select(:id, :query).distinct

    # Update substring flags
    all_queries.each do |q|
      is_sub = all_queries.any? do |other|
        other.query != q.query &&
        other.query.start_with?(q.query) &&
        other.query.length > q.query.length
      end

      q.update(is_substring: is_sub)
    end

    # Get top queries excluding substrings
    top_queries = SearchQuery
      .where(is_substring: false)
      .group(:query)
      .order('count_id DESC')
      .limit(10)
      .count(:id)
      .to_a
      
    ActionCable.server.broadcast("top_searches", {
      queries: top_queries.first(5).map { |q, count| { query: q, count: count } }
    })

    head :ok
  end

  def top
    raw_queries = SearchQuery
      .group(:query)
      .select("query, COUNT(*) as count")
      .having("LENGTH(query) > 3")
      .order("count DESC")
  
    queries = raw_queries.map(&:query)
    filtered_queries = queries.reject do |q|
      queries.any? { |other| other != q && other.include?(q) }
    end
  
    render json: filtered_queries
  end

  def recent
    ip = request.remote_ip
    recent_queries = SearchQuery.where(ip_address: request.remote_ip)
    .order('created_at DESC')
    .limit(5)
  
    render json: recent_queries.map(&:query)
  end
  
end
