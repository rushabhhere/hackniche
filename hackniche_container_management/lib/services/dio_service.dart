import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';

class DioService {
  Dio dio = Dio();

  Future<Response> get(String url, Map<String, dynamic> data) async {
    try{
      return dio.get(url, queryParameters: data);
    } catch(e){
      debugPrint(e.toString());
      throw e;
    }
  }
}