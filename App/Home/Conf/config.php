<?php
return array(
	//'设置模板替换变量
    'TMPL_PARSE_STRING' => array(
        '__EASYUI__'=>__ROOT__.'/Public/easyui',
        '__EDITOR__'=>__ROOT__.'/Public/kindeditor',
        '__CSS__'=>__ROOT__.'/Public/css',
        '__JS__'=>__ROOT__.'/Public/js',
        '__IMG__'=>__ROOT__.'/Public/img',
    ),
    //拒绝强制小写
    'DB_PARAMS'=>array(\PDO::ATTR_CASE => \PDO::CASE_NATURAL),
);